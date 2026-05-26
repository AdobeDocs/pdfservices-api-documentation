#!/usr/bin/env python3
"""Batch EDS lint fixes: frontmatter (title/description, title length) + common markdown errors."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "src" / "pages"


def transform_outside_fences(text: str, fn) -> str:
    """fn receives full non-code string (may include multiple sections)."""
    out: list[str] = []
    i = 0
    while i < len(text):
        j = text.find("```", i)
        if j == -1:
            out.append(fn(text[i:]))
            break
        out.append(fn(text[i:j]))
        k = text.find("\n", j)
        if k == -1:
            out.append(text[j:])
            break
        k2 = text.find("```", k + 1)
        if k2 == -1:
            out.append(text[j:])
            break
        out.append(text[j : k2 + 3])
        i = k2 + 3
    return "".join(out)


def add_frontmatter(text: str, rel: Path) -> str:
    if not text.startswith("---"):
        return text
    m = re.match(r"^(---\s*\n)(.*?)(\n---\s*\n)([\s\S]*)$", text)
    if not m:
        return text
    prefix, fm_body, mid, body = m.groups()
    title_m = re.search(r"(?m)^title:\s*(.+)$", fm_body)
    desc_m = re.search(r"(?m)^description:\s*(.*)$", fm_body)
    title_val = title_m.group(1).strip().strip('"').strip("'") if title_m else ""
    desc_val = (desc_m.group(1).strip().strip('"').strip("'") if desc_m else "") or ""

    h1_m = re.search(r"(?m)^#\s+(.+)$", body)
    h1 = h1_m.group(1).strip() if h1_m else rel.stem.replace("-", " ").title()

    changes = False
    new_fm = fm_body
    if not title_val:
        line = f'title: "{h1[:200]}"'
        new_fm = line + "\n" + new_fm
        changes = True
        title_val = h1
    if len(title_val) > 60:
        short = title_val[:57].rstrip() + "..."
        new_fm = re.sub(r"(?m)^title:\s*.+$", f'title: "{short}"', new_fm)
        changes = True

    if not desc_val:
        desc = ""
        for blk in body.split("\n\n"):
            b = blk.strip()
            if not b or b.startswith("#") or b.startswith("<"):
                continue
            plain = re.sub(r"`[^`]+`", "", b)
            plain = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", plain)
            plain = re.sub(r"[*_#]", "", plain).strip()
            if len(plain) > 25:
                desc = plain[:297] + ("..." if len(plain) > 297 else "")
                break
        if not desc:
            desc = f"Documentation for {h1}."
        desc_esc = desc.replace("\\", " ").replace('"', "'")
        insert = f'description: "{desc_esc}"'
        if "description:" not in fm_body:
            new_fm = new_fm.rstrip() + "\n" + insert + "\n"
            changes = True
        else:
            new_fm = re.sub(r"(?m)^description:\s*.+$", insert, new_fm)
            changes = True

    if not changes:
        return text
    return prefix + new_fm + mid + body


def fix_segment(seg: str, rel_file: Path) -> str:
    s = seg

    # ../pdf-electronic-seal from overview/ pages
    rp = rel_file.as_posix()
    if "/overview/" in rp and "legacy-documentation" not in rp:
        s = re.sub(
            r"\]\(\.\./pdf-electronic-seal-api/",
            r"](./pdf-electronic-seal-api/",
            s,
        )

    # Release notes: howtos under pdf-services-api
    if rp.endswith("overview/releasenotes.md"):
        s = s.replace("](howtos/", "](pdf-services-api/howtos/")

    # Media -> Embed
    s = re.sub(
        r"<Media\s+slots=(?:\"|')video(?:\"|')\s*/>",
        '<Embed slots="video" />',
        s,
        flags=re.I,
    )

    # file.md/#anchor -> file.md#anchor
    s = re.sub(r"(\.md)/#", r"\1#", s)

    # document-services pricing dead paths -> absolute
    s = s.replace(
        "](../../document-services/pricing)",
        "](https://developer.adobe.com/document-services/pricing/main/)",
    )
    s = s.replace(
        "](../../document-services/pricing/",
        "](https://developer.adobe.com/document-services/pricing/main/",
    )
    s = s.replace(
        "../../../document-services/pricing",
        "https://developer.adobe.com/document-services/pricing/main/",
    )
    s = s.replace(
        "../../document-services/pricing",
        "https://developer.adobe.com/document-services/pricing/main/",
    )

    # apis/#tag -> apis/index.md#tag
    for a, b in (
        ("../../../apis/#", "../../../apis/index.md#"),
        ("../../apis/#", "../../apis/index.md#"),
        ("../apis/#", "../apis/index.md#"),
        ("./apis/#", "./apis/index.md#"),
    ):
        s = s.replace(a, b)

    # angle brackets URLs left
    def repl_angle(m: re.Match) -> str:
        u = m.group(1)
        lab = "Video" if ".mp4" in u else "Link"
        return f"[{lab}]({u})"

    s = re.sub(r"<((?:https?|mailto)://[^>\s]+)>", repl_angle, s)

    # br
    s = s.replace("<br/>", "\\<br/\\>").replace("<br />", "\\<br/\\>").replace("<br>", "\\<br\\>")

    return s


def process(path: Path) -> bool:
    rel = path.relative_to(PAGES)
    raw = path.read_text(encoding="utf-8")
    if path.name == "config.md":
        return False

    updated = add_frontmatter(raw, rel)
    updated = transform_outside_fences(updated, lambda seg: fix_segment(seg, rel))

    if updated != raw:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


def main() -> int:
    n = 0
    for md in sorted(PAGES.rglob("*.md")):
        try:
            if process(md):
                n += 1
                print(md.relative_to(ROOT))
        except Exception as e:
            print(f"ERR {md}: {e}", file=sys.stderr)
    print(f"Modified {n} files.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
