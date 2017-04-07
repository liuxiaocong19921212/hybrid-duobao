module.exports = {
    'coupon-newcomer': {
        comps: false,
        version: 2,
        deps: [
            'plugin_core_ios',
            'plugin_core_android',
            'components'
        ]
    },
    'cms': {
        comps: false,
        version: 82,
        deps: [
            'plugin_core_ios',
            'plugin_core_android',
            'components'
        ]
    },
    'duobao': {
        comps: false,
        version: 8,
        deps: [
            'plugin_core_ios',
            'plugin_core_android',
            'components'
        ]
    },
    'components': {
        comps: true,
        version: 19,
    },
    'plugin_core_ios': {
        comps: true,
        version: {
            sdk3: 9,
            sdk2: 6
        },
    },
    'plugin_core_android': {
        comps: true,
        version: {
            sdk3: 9,
            sdk2: 6
        },
    },
}