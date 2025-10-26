interface ImportMetaEnv {
  readonly SOLID_IDP : string;
  readonly SOLID_USERNAME : string;
  readonly SOLID_PASSWORD : string;
  readonly SOLID_VAULT_BASE_PATH : string;
  readonly LOCAL_VAULT_BASE_PATH : string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="astro/client" />
  namespace App {
    interface Locals {
      filterSidebar: (links: (ReferenceDataEntry<"structural", string> | ReferenceDataEntry<"docs", string> | ReferenceDataEntry<"about", string> | ReferenceDataEntry<"thesis", string> | ReferenceDataEntry<"metaThesis", string> | ReferenceDataEntry<"thesisParts", string> | ReferenceDataEntry<"earth", string> | ReferenceDataEntry<"library", string>)[] | undefined) => boolean;
    }
  }