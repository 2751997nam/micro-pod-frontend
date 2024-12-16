export default {
    currency_unit: process.env.CURRENCY_UNIT || 'USD',
    default_locale: process.env.DEFAULT_LOCALE || 'us',
    currency_template: {
        USD: '${money}{.}{2}',
        VND: '{money}{,}{0} ₫',
        JPY: '¥{money}{.}{2}',
        EUR: '{money}{,}{2}€',
        GBP: '£{money}{.}{2}',
        CAD: 'C${money}{.}{2}',
        AUD: 'A${money}{.}{2}',
    } as { [key: string]: any },
    variant_sorder: {
        top: new Map([
            [5, 'type'],
            [7, 'style'],
            [23, 'design'],
            [88, 'design'],
            [2, 'color'],
        ]),
        bottom: new Map([[1, 'size']]),
    },
    currencyRatio: {
        us: 1,
        ca: 1.2547849,
        au: 1.3478404,
        uk: 0.72308677,
        jp: 110.02712,
        fr: 0.84206762,
        de: 0.84206762,
        it: 0.84206762,
        es: 0.84206762,
        pt: 0.84206762,
        central: 1,
    },
    size_sort_default: [
        'xs',
        's',
        'small',
        'm',
        'medium',
        'l',
        'large',
        'xl',
        'extra-large',
        '2xl',
        'xxl',
        '3xl',
        '4xl',
        '5xl',
    ],
    // eslint-disable-next-line prettier/prettier
    type_sort_default: [
        'men', 
        'women', 
        'unisex',
        'youth',
        'kids', 
    ],
};
