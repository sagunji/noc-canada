declare module "@canoeh/nocs" {
  export interface NocItem {
    noc_code: string;
    title: string;
    description: string;
    link: string;
    teer: {
      level: number;
      title: string;
    };
    hierarchy: {
      broad_group: { code: string; title: string };
      major_group: { code: string; title: string };
      minor_group: { code: string; title: string };
    };
  }

  export function searchNOCs(keyword: string): NocItem[];
  export function getNOCByCode(code: string): NocItem | undefined;
}
