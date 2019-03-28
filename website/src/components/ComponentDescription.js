import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import config from '../config'

const ComponentDescription = memo(({
    description,
}) => {
    return (
        <div className="chart-description">
            <ReactMarkdown source={description}/>
        </div>
    )
})

ComponentDescription.displayName = 'ComponentDescription'

export default ComponentDescription
