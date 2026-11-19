---
title: Writing in Markdown, rendered crisply
date: 2026-11-18
description: A tour of everything this blog's markdown pipeline can render.
draft: true
---

This post is a sample. It shows everything the pipeline supports, so you can copy from it when writing a real post. Everything here is rendered to static HTML **at build time**, so pages ship with no JavaScript for highlighting or math.

## Prose and emphasis

Body text is set in PT Serif, with headings and UI in Inter. You get *italics*, **bold**, `inline code`, ~~strikethrough~~, and [links](https://fabioibanez.com) that underline subtly in the accent color. Footnotes work too.[^1]

> Simplicity is prerequisite for reliability.
>
> — Edsger W. Dijkstra

## Code

Fenced blocks are highlighted by Shiki using the same grammars as VS Code. Add a title, highlight lines with `{2-3}`, or mark individual words:

```python title="eval.py" {4-5}
def pass_at_k(n: int, c: int, k: int) -> float:
    """Unbiased pass@k estimator (Chen et al., 2021)."""
    if n - c < k:
        return 1.0
    return 1.0 - math.prod(1 - k / i for i in range(n - c + 1, n + 1))
```

```rust /unsafe/
fn read_reg(addr: usize) -> u32 {
    unsafe { core::ptr::read_volatile(addr as *const u32) }
}
```

Shell sessions and diffs work as well:

```diff
- let timeout = 30;
+ let timeout = Duration::from_secs(30);
```

## Math

Inline math like $\mathbb{E}[X] = \sum_x x\,p(x)$ sits on the baseline. Display math gets its own line:

$$
\mathcal{L}(\theta) = -\sum_{t=1}^{T} \log p_\theta(x_t \mid x_{<t})
$$

## Tables

| Model    | pass@1 | pass@10 | Notes            |
| -------- | -----: | ------: | ---------------- |
| baseline |  41.2% |   68.0% | greedy decoding  |
| tuned    |  57.9% |   81.4% | T = 0.8, top-p 0.95 |

## Lists

1. Write the post in `content/blog/<slug>.md`.
2. Run `npm run dev` and open `/blog/<slug>`.
3. Remove `draft: true` when it's ready.

- [x] Syntax highlighting
- [x] Math
- [ ] Something you add later

### Images

Put images in `public/` and reference them with an absolute path:

![Fabio with Bjarne Stroustrup](/bjarne.jpg)

---

That's it. Headings get anchor links (hover one), so you can link to sections like [#math](#math).

[^1]: Footnotes are collected at the bottom of the post, with backlinks.
