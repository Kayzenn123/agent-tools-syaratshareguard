import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Kamus Syarat', href: getPermalink('/#kamus') },
    { text: 'Tracker', href: getPermalink('/#tracker') },
    { text: 'Pesan', href: getPermalink('/#pesan') },
    { text: 'Privasi', href: getPermalink('/#privasi') },
  ],
  actions: [{ text: 'Mulai lacak', href: getPermalink('/#tracker') }],
};

export const footerData = {
  links: [
    {
      title: 'Alat',
      links: [
        { text: 'Kamus Syarat', href: getPermalink('/#kamus') },
        { text: 'Tracker Share', href: getPermalink('/#tracker') },
        { text: 'Generator Pesan', href: getPermalink('/#pesan') },
        { text: 'Pengingat Privasi', href: getPermalink('/#privasi') },
      ],
    },
    {
      title: 'Tentang',
      links: [
        { text: 'Kenapa ini ada', href: getPermalink('/#kenapa') },
        { text: 'Kode sumber', href: 'https://github.com/Kayzenn123/agent-tools-syaratshareguard' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/Kayzenn123/agent-tools-syaratshareguard' },
  ],
  footNote: `Difotokopi dengan marah oleh Mas Penjaga · SyaratShareGuard — jangan spam, Dek.`,
};
