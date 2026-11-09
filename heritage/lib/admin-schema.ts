/**
 * Declarative admin configuration. One generic CRUD UI renders every model
 * from these definitions, so adding an entity means adding a block here —
 * not writing new pages.
 */
import { LIVERY_KINDS, PHOTO_VIEWS, TEAM_KINDS, TIMELINE_CATEGORIES, VERIFICATION, ERAS } from "./vocab";

export type FieldType = "text" | "textarea" | "number" | "date" | "boolean" | "select" | "relation" | "multi" | "json";
export type Field = {
  name: string; label: string; type: FieldType; required?: boolean; help?: string;
  options?: Record<string, string>;
  relation?: { model: ModelKey; labelField: string };
  /** multi: join table + key fields */
  join?: { model: string; selfKey: string; otherKey: string; extra?: Record<string, string> };
};

export type ModelKey = "vehicle" | "livery" | "photo" | "team" | "driver" | "entry" | "event" | "result" | "timelineEntry" | "source" | "manufacturer" | "championship" | "spec";

export type ModelDef = { key: ModelKey; label: string; plural: string; title: string; list: string[]; fields: Field[]; orderBy?: Record<string, "asc" | "desc">; citable?: string };

const verification: Field = { name: "verification", label: "Verification", type: "select", options: Object.fromEntries(Object.entries(VERIFICATION).map(([k, v]) => [k, v.label])), required: true };
const rel = (name: string, label: string, model: ModelKey, labelField: string, required = false): Field => ({ name, label, type: "relation", relation: { model, labelField }, required });

export const MODELS: ModelDef[] = [
  {
    key: "vehicle", label: "Vehicle", plural: "Vehicles", title: "fullName", list: ["fullName", "category", "debutYear", "status"], orderBy: { debutYear: "desc" }, citable: "Vehicle",
    fields: [
      { name: "slug", label: "URL slug", type: "text", required: true, help: "Lowercase, hyphenated. Used in /vehicles/<slug>." },
      rel("manufacturerId", "Manufacturer", "manufacturer", "name", true),
      { name: "model", label: "Model", type: "text", required: true },
      { name: "fullName", label: "Full name", type: "text", required: true },
      { name: "category", label: "Racing category", type: "text", required: true },
      { name: "era", label: "Era", type: "select", options: ERAS, required: true },
      { name: "status", label: "Status", type: "select", options: { published: "Published", "in-research": "In research" }, required: true },
      { name: "debutYear", label: "Debut year", type: "number", required: true },
      { name: "retiredYear", label: "Retired year", type: "number" },
      { name: "country", label: "Country (ISO-3)", type: "text", required: true },
      { name: "featured", label: "Featured on homepage", type: "boolean" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "development", label: "Development history", type: "textarea" },
      { name: "unveiling", label: "Official unveiling", type: "textarea" },
      { name: "firstAppearance", label: "First public appearance", type: "textarea" },
      { name: "firstRace", label: "First competitive race", type: "textarea" },
      { name: "background", label: "Historical background", type: "textarea" },
      rel("heroLiveryId", "Hero livery", "livery", "name"),
    ],
  },
  {
    key: "livery", label: "Livery", plural: "Liveries", title: "name", list: ["name", "year", "kind", "carNumbers", "verification"], orderBy: { year: "asc" }, citable: "Livery",
    fields: [
      { name: "slug", label: "URL slug", type: "text", required: true },
      rel("vehicleId", "Vehicle", "vehicle", "fullName", true),
      { name: "name", label: "Livery name", type: "text", required: true },
      { name: "kind", label: "Type", type: "select", options: LIVERY_KINDS, required: true },
      rel("parentId", "Parent design", "livery", "name"),
      { name: "isVariation", label: "Seasonal variation of parent (not a new design)", type: "boolean" },
      { name: "year", label: "Year", type: "number", required: true },
      { name: "season", label: "Season", type: "text" },
      rel("teamId", "Team", "team", "name"),
      rel("championshipId", "Championship", "championship", "name"),
      { name: "carNumbers", label: "Car numbers", type: "text", help: "Comma separated, e.g. 5, 6, 75" },
      { name: "event", label: "Race or event", type: "text" },
      { name: "firstUsed", label: "First used", type: "date" },
      { name: "sponsors", label: "Sponsors", type: "text", help: "Comma separated" },
      { name: "background", label: "Historical background", type: "textarea" },
      { name: "inspiration", label: "Inspiration", type: "textarea" },
      { name: "design", label: "Illustration palette (JSON)", type: "json", help: '{"base":"#fff","accents":["#c00","#111"],"pattern":"works|stripes|camo|split|band|gt1|rainbow|solid|neutral","note":"…"}' },
      { name: "drivers", label: "Drivers", type: "multi", relation: { model: "driver", labelField: "name" }, join: { model: "liveryDriver", selfKey: "liveryId", otherKey: "driverId" } },
      verification,
    ],
  },
  {
    key: "photo", label: "Photograph", plural: "Photographs", title: "alt", list: ["alt", "view", "credit", "license"],
    fields: [
      { name: "url", label: "Image URL", type: "text", required: true, help: "/photos/<file> for archived files, or a full HTTPS URL." },
      { name: "alt", label: "Alt text", type: "text", required: true },
      { name: "caption", label: "Caption", type: "textarea" },
      { name: "credit", label: "Credit", type: "text", required: true, help: "Photographer / agency. Required before publication." },
      { name: "license", label: "Licence", type: "text", required: true, help: "e.g. CC BY-SA 4.0, via Wikimedia Commons" },
      { name: "licenseUrl", label: "Licence URL", type: "text" },
      { name: "sourceUrl", label: "Source page", type: "text", required: true, help: "Where the image and its licence can be checked." },
      { name: "takenAt", label: "Date taken", type: "text" },
      { name: "width", label: "Width (px)", type: "number" },
      { name: "height", label: "Height (px)", type: "number" },
      { name: "focal", label: "Crop focus", type: "text", help: "CSS object-position, e.g. 50% 40%" },
      { name: "view", label: "View", type: "select", options: Object.fromEntries(PHOTO_VIEWS.map((v) => [v, v])), required: true },
      { name: "order", label: "Order", type: "number" },
      rel("vehicleId", "Vehicle", "vehicle", "fullName"),
      rel("liveryId", "Livery", "livery", "name"),
      rel("timelineEntryId", "Timeline entry", "timelineEntry", "title"),
    ],
  },
  {
    key: "team", label: "Team", plural: "Teams", title: "name", list: ["name", "kind", "country"], orderBy: { name: "asc" }, citable: "Team",
    fields: [
      { name: "slug", label: "URL slug", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "country", label: "Country", type: "text", required: true },
      { name: "kind", label: "Type", type: "select", options: TEAM_KINDS, required: true },
      { name: "description", label: "Description", type: "textarea" },
      verification,
    ],
  },
  {
    key: "driver", label: "Driver", plural: "Drivers", title: "name", list: ["name", "nationality"], orderBy: { name: "asc" },
    fields: [
      { name: "slug", label: "URL slug", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "nationality", label: "Nationality (ISO-3)", type: "text", required: true },
    ],
  },
  {
    key: "entry", label: "Season entry", plural: "Seasons & entries", title: "carNumber", list: ["season", "carNumber", "scope", "verification"], orderBy: { season: "asc" }, citable: "Entry",
    fields: [
      rel("vehicleId", "Vehicle", "vehicle", "fullName", true),
      rel("teamId", "Team", "team", "name", true),
      rel("championshipId", "Championship", "championship", "shortName", true),
      { name: "season", label: "Season", type: "number", required: true },
      { name: "carNumber", label: "Car number", type: "text", required: true },
      { name: "scope", label: "Scope", type: "select", options: { "full-season": "Full season", "endurance-only": "Endurance only", "one-off": "One-off" }, required: true },
      { name: "notes", label: "Notes", type: "textarea" },
      { name: "drivers", label: "Drivers", type: "multi", relation: { model: "driver", labelField: "name" }, join: { model: "entryDriver", selfKey: "entryId", otherKey: "driverId" } },
      verification,
    ],
  },
  {
    key: "event", label: "Race / event", plural: "Races & events", title: "name", list: ["name", "season", "circuit"], orderBy: { date: "asc" },
    fields: [
      { name: "slug", label: "URL slug", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      rel("championshipId", "Championship", "championship", "shortName", true),
      { name: "season", label: "Season", type: "number", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "datePrecision", label: "Date precision", type: "select", options: { day: "Day", month: "Month" }, required: true },
      { name: "circuit", label: "Circuit", type: "text", required: true },
      { name: "country", label: "Country", type: "text", required: true },
    ],
  },
  {
    key: "result", label: "Race result", plural: "Race results", title: "headline", list: ["position", "headline", "highlight", "verification"], citable: "Result",
    fields: [
      rel("vehicleId", "Vehicle", "vehicle", "fullName", true),
      rel("eventId", "Event", "event", "slug", true),
      rel("entryId", "Season entry", "entry", "carNumber"),
      { name: "position", label: "Position", type: "text", required: true, help: "1, 2, DNF, Pole…" },
      { name: "headline", label: "Headline", type: "text" },
      { name: "notes", label: "Notes", type: "textarea" },
      { name: "highlight", label: "Major achievement", type: "boolean" },
      verification,
    ],
  },
  {
    key: "timelineEntry", label: "Timeline entry", plural: "Timeline", title: "title", list: ["date", "title", "category", "verification"], orderBy: { date: "asc" }, citable: "TimelineEntry",
    fields: [
      rel("vehicleId", "Vehicle", "vehicle", "fullName", true),
      { name: "date", label: "Date", type: "date", required: true },
      { name: "datePrecision", label: "Date precision", type: "select", options: { day: "Day", month: "Month", year: "Year" }, required: true },
      { name: "title", label: "Event", type: "text", required: true },
      { name: "description", label: "Historical description", type: "textarea", required: true },
      { name: "category", label: "Category", type: "select", options: TIMELINE_CATEGORIES, required: true },
      rel("teamId", "Team", "team", "name"),
      rel("liveryId", "Livery used", "livery", "name"),
      { name: "milestone", label: "Milestone", type: "boolean" },
      verification,
    ],
  },
  {
    key: "source", label: "Historical reference", plural: "References", title: "title", list: ["title", "publisher", "kind"], orderBy: { published: "desc" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "publisher", label: "Publisher", type: "text", required: true },
      { name: "url", label: "URL", type: "text", required: true },
      { name: "kind", label: "Type", type: "select", options: { official: "Manufacturer / team", "governing-body": "Governing body / organiser", publication: "Publication", press: "Press", results: "Results" }, required: true },
      { name: "published", label: "Published", type: "date" },
      { name: "accessed", label: "Accessed", type: "date" },
    ],
  },
  {
    key: "spec", label: "Specification", plural: "Specifications", title: "label", list: ["group", "label", "value"], orderBy: { order: "asc" }, citable: "Spec",
    fields: [
      rel("vehicleId", "Vehicle", "vehicle", "fullName", true),
      { name: "group", label: "Group", type: "text", required: true },
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value", type: "text", required: true },
      { name: "order", label: "Order", type: "number" },
      verification,
    ],
  },
  {
    key: "manufacturer", label: "Manufacturer", plural: "Manufacturers", title: "name", list: ["name", "country"], orderBy: { name: "asc" },
    fields: [
      { name: "slug", label: "URL slug", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "country", label: "Country", type: "text", required: true },
    ],
  },
  {
    key: "championship", label: "Championship", plural: "Championships", title: "name", list: ["name", "shortName", "body"], orderBy: { name: "asc" },
    fields: [
      { name: "slug", label: "URL slug", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "shortName", label: "Short name", type: "text", required: true },
      { name: "body", label: "Sanctioning body", type: "text", required: true },
    ],
  },
];

export const modelDef = (key: string) => MODELS.find((m) => m.key === key);
