TABS

Your classes use data-active: prefix (e.g., data-active:shadow-sm, data-active:text-foreground), but your rendered element has data-state="active", not a data-active attribute.
The Issue
Tailwind's data-* variant syntax works like this:

data-active: looks for data-active attribute
data-[state=active]: looks for data-state="active" attribute

Your component has data-state="active", so you need to use data-[state=active]: instead of data-active:.

You need to update your ShadCN tabs component configuration. The classes should use:

data-[state=active]: instead of data-active:

PARENT

The issue is likely that your parent tabs list element doesn't have the correct data-variant or data-orientation attributes, OR it doesn't have the group-horizontal class.

The underline visibility depends on:

The parent having class="... group-horizontal/tabs ..." (or group-data-horizontal/tabs)
The parent having data-variant="line"
The button being data-state="active"

Found it! The issue is clear now. Look at the parent <div role="tablist">:
Parent has:

✅ data-variant="line"
✅ data-orientation="horizontal"
✅ class="... group/tabs-list ..."

But the buttons are looking for:

❌ group-data-horizontal/tabs (doesn't exist!)
✅ group-data-[variant=line]/tabs-list (this works!)

In your tabs.tsx file, change all instances of:
group-data-horizontal/tabs
to:
group-data-[orientation=horizontal]/tabs-list
And change:
group-data-vertical/tabs
to:
group-data-[orientation=vertical]/tabs-list

Found it! Look at the root <div> classes:
html<div ... class="gap-2 group/tabs flex data-horizontal:flex-col">
The problem is data-horizontal:flex-col - this is invalid Tailwind syntax. It should be data-[orientation=horizontal]:flex-col.
Currently:

flex is applied (defaults to flex-row)
data-horizontal:flex-col doesn't match anything because there's no data-horizontal attribute

So it stays as flex-row, putting content to the right.
The Fix
In your tabs.tsx, find the root Tabs component and change:
❌ Wrong:
tsxclassName="... flex data-horizontal:flex-col"
✅ Correct:
tsxclassName="... flex data-[orientation=horizontal]:flex-col"