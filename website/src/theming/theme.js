const dimensions = {
    headerHeight: 60,
    contentMargin: 30,
    contentMarginSmall: 20,
    miniNavItemSize: 66,
}
dimensions.miniNavWidth = dimensions.miniNavItemSize * 2

export default {
    light: {
        colors: {
            background: '#f7fafb',

            text: '#000000',
            textLight: '#666666',

            border: '#dddddd',
            borderLight: '#eeeeee',

            accent: '#e25d47',
            accentLight: '#f88d81',
            accentDark: '#b44230',

            cardBackground: '#ffffff',
            cardAltBackground: '#f7fafb',

            inputBackground: '#f7fafb',
            inputBorder: '#cccccc',
        },
        dimensions,

        cardShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        topCardShadow: '0 16px 30px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.06)',

        nivo: {
            axis: {
                domain: {
                    line: {
                        strokeWidth: 0,
                        stroke: '#889eae',
                    },
                },
                ticks: {
                    line: {
                        stroke: '#889eae',
                    },
                    text: {
                        fill: '#6a7c89',
                    },
                },
                legend: {
                    fill: '#889eae',
                },
            },
            legends: {
                text: {
                    fontSize: 12,
                },
            },
            tooltip: {
                container: {
                    fontSize: '13px',
                },
            },
            labels: {
                text: {
                    fill: '#555',
                },
            },
        },
    },
    dark: {
        colors: {
            background: '#2e2e2e',

            text: '#eee',
            textLight: '#aaaaaa',

            border: '#111111',
            borderLight: '#1a1a1a',

            accent: '#e25d47',
            accentLight: '#f88d81',
            accentDark: '#b44230',

            cardBackground: '#222222',
            cardAltBackground: '#292929',

            inputBackground: '#333333',
            inputBorder: '#111111',
        },
        dimensions,

        cardShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
        topCardShadow: '0 16px 30px rgba(0, 0, 0, 0.3)',

        nivo: {
            background: '#222',
            axis: {
                domain: {
                    line: {
                        strokeWidth: 0,
                        stroke: '#bbb',
                    },
                },
                ticks: {
                    line: {
                        stroke: '#bbb',
                    },
                    text: {
                        fill: '#bbb',
                    },
                },
                legend: {
                    text: {
                        fill: '#eee',
                        fontSize: 12,
                        fontWeight: 500,
                    },
                },
            },
            grid: {
                line: {
                    stroke: '#444',
                },
            },
            legends: {
                text: {
                    fontSize: 12,
                    fill: '#eee',
                },
            },
            tooltip: {
                container: {
                    fontSize: '13px',
                    background: '#000',
                    color: '#ddd',
                },
            },
            labels: {
                text: {
                    fill: '#ddd',
                    fontSize: 12,
                    fontWeight: 500,
                },
            },
            dots: {
                text: {
                    fill: '#bbb',
                    fontSize: 12,
                },
            },
        },
    },
}
