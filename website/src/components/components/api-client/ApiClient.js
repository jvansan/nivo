/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ComponentPage from '../ComponentPage'
import ComponentHeader from '../ComponentHeader'
import ComponentDescription from '../ComponentDescription'
import ComponentSettings from '../ComponentSettings'
import ApiTabs from './ApiTabs'
import ApiSubmit from './ApiSubmit'
import ApiResponse from './ApiResponse'
import ApiPreview from './ApiPreview'
import config from '../../../data/config'

const description = (component, apiPath) => `
\`POST ${apiPath}\`

The \`${component}\`component is available in the nivo
HTTP rendering API.
The API generates a SVG and return a path to this SVG
which can then be easily embedded.

The api accepts the same properties as the regular component,
however, it's not interactive and you cannot use code in properties
(functions).

Please note that the API server is installed on heroku
using a free plan, so it might be unavailable from times to times.
`

export default class ApiClient extends Component {
    static propTypes = {
        componentName: PropTypes.string.isRequired,
        chartClass: PropTypes.string.isRequired,
        apiPath: PropTypes.string.isRequired,
        dataProperty: PropTypes.string.isRequired,
        propsMapper: PropTypes.func.isRequired,
    }

    static defaultProps = {
        dataProperty: 'data',
        propsMapper: props => props,
    }

    constructor(props) {
        super(props)

        this.state = {
            props: props.defaultProps,
            loading: false,
            responseStatus: null,
            response: null,
        }
    }

    handleSettingsUpdate = settings => {
        this.setState({ props: settings })
    }

    handleDataUpdate = e => {
        const { dataProperty } = this.props
        const { props } = this.state

        this.setState({
            props: Object.assign({}, props, {
                [dataProperty]: e.target.value,
            }),
        })
    }

    handleSubmit = () => {
        const { apiPath, propsMapper } = this.props
        const { props } = this.state

        this.setState({
            loading: true,
            response: null,
            responseStatus: null,
        })

        fetch(`${config.nivoApiUrl}${apiPath}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propsMapper(props)),
        })
            .then(res => {
                this.setState({
                    loading: false,
                    responseStatus: res.status,
                })

                return res.json()
            })
            .then(res => {
                this.setState({ response: res })
            })
            .catch(err => {
                console.error(err)
            })
    }

    componentDidMount() {
        //this.handleSubmit()
    }

    render() {
        const {
            componentName,
            chartClass,
            apiPath,
            controlGroups,
            dataProperty,
            propsMapper,
        } = this.props
        const { props, loading, responseStatus, response } = this.state

        return (
            <ComponentPage>
                <ComponentHeader chartClass={`${componentName} HTTP API`} />
                <ComponentDescription description={description(componentName, apiPath)} />
                <ApiTabs
                    chartClass={chartClass}
                    data={props[dataProperty]}
                    body={propsMapper(props)}
                />
                <ApiSubmit loading={loading} onClick={this.handleSubmit} />
                <ApiPreview responseStatus={responseStatus} url={response ? response.url : null} />
                <ApiResponse responseStatus={responseStatus} response={response} />
                <ComponentSettings
                    component={componentName}
                    scope="api"
                    settings={props}
                    groups={controlGroups}
                    onChange={this.handleSettingsUpdate}
                />
            </ComponentPage>
        )
    }
}
