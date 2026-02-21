# LlamaDNS Project Guidelines

## Design System

Always use components from `app/design-system/components/` for UI elements. If a component doesn't exist for what you need, create one in the design system first, then use it.

Available components: `SectionHeading`, `IconBox`, `BentoCard`, `Button`, `StatusBadge`, `MethodBadge`, `IntegrationBadge`, `CodeBlock`, `AccordionItem`, `SectionDivider`.

Import from `../design-system/components` (or appropriate relative path).

### Button variants

- `secondary` — glass border/bg, default for most actions (Reveal, Copy, Sign out)
- `primary` — accent-colored, for primary actions (Add domain)
- `danger` — red text with glass border, for destructive actions (Delete, Regenerate)
- `ghost` — text-only, no border/bg
