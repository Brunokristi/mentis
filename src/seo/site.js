export const SITE_NAME = 'Mentis'

export const SITE_ALTERNATE_NAME = 'Klinicka psychologia Mentis'

export const SITE_URL = 'https://klinickapsychologialucenec.sk'

export const SITE_LOCALE = 'sk_SK'

export const PRIMARY_OG_IMAGE_PATH = '/images/mentis_logo_horizontal.png'

export const STRUCTURED_DATA_LOGO_PATH = '/images/mentis_logo.png'

export const PUBLIC_ROUTES = Object.freeze({
    home: '/',
    team: '/tim',
    services: '/sluzby',
    contact: '/kontakt'
})

export const PAGE_SEO = Object.freeze({
    home: {
        path: PUBLIC_ROUTES.home,
        title: 'Klinický psychológ Lučenec | Mentis',
        description:
            'Ambulancia klinickej psychológie Mentis v Lučenci. Informácie o psychologických službách, pracovisku, ordinačných hodinách a možnostiach objednania.'
    },

    services: {
        path: PUBLIC_ROUTES.services,
        title: 'Psychologické služby Lučenec | Mentis',
        description:
            'Prehľad odborných psychologických služieb ambulancie Mentis v Lučenci. Zistite, ako jednotlivé vyšetrenia a konzultácie prebiehajú.'
    },

    contact: {
        path: PUBLIC_ROUTES.contact,
        title: 'Kontakt – psychológ Lučenec | Mentis',
        description:
            'Kontaktujte ambulanciu klinickej psychológie Mentis v Lučenci. Nájdete tu adresu, telefón, e-mail, ordinačné hodiny a možnosti objednania.'
    }
})

export function absoluteUrl(path = '') {
    if (!path) {
        return SITE_URL
    }

    if (/^https?:\/\//i.test(path)) {
        return path
    }

    return new URL(path, `${SITE_URL}/`).toString()
}

export function canonicalUrl(path = PUBLIC_ROUTES.home) {
    const normalizedPath = String(path || '/').startsWith('/')
        ? String(path || '/')
        : `/${String(path || '/')}`

    return normalizedPath === '/'
        ? `${SITE_URL}/`
        : `${SITE_URL}${normalizedPath}`
}

export function safeValue(value) {
    if (value === null || value === undefined) {
        return null
    }

    if (typeof value === 'string') {
        const trimmed = value.trim()

        return trimmed.length ? trimmed : null
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
        return value
    }

    return value
}

export function filterNullValues(values) {
    return values.filter((value) => value !== null && value !== undefined && value !== '')
}
