import { RocketIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Projects")
        .icon(RocketIcon)
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .defaultOrdering([
              { field: "featured", direction: "desc" },
              { field: "createdAt", direction: "desc" },
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "project"
      ),
    ]);
