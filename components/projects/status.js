// Shared status presentation for projects (cards + detail page).
export const STATUS = {
  completed: {
    label: "Completed",
    dot: "bg-emerald-400",
    className: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  },
  "in-progress": {
    label: "In Progress",
    dot: "bg-amber-400",
    className: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  },
  planned: {
    label: "Planned",
    dot: "bg-sky-400",
    className: "border-sky-500/30 bg-sky-500/15 text-sky-400",
  },
};

export const getStatus = (value) => STATUS[value] ?? STATUS.completed;
