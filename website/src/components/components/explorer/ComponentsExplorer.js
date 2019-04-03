/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageContent from '../../PageContent'
import URLSearchParams from 'url-search-params'
import ComponentsSearch from './ComponentsSearch'
import ComponentsFilters from './ComponentsFilters'
import ComponentsGrid from './ComponentsGrid'

const ComponentsExplorer = ({ location, navigate }) => {
    const [term, filter] = useMemo(() => {
        const params = new URLSearchParams(location.search)
        return [params.get('q'), params.get('filter')]
    }, [location.search])
    const handleSearch = useCallback(
        term => {
            const params = new URLSearchParams()
            if (term) params.append('q', term)
            if (filter) params.append('filter', filter)

            navigate(`/components?${params.toString()}`, {
                replace: true,
            })
        },
        [filter, navigate]
    )
    const handleFilter = useCallback(
        filter => {
            const params = new URLSearchParams()
            if (term) params.append('q', term)
            if (filter) params.append('filter', filter)

            navigate(`/components?${params.toString()}`)
        },
        [term, navigate]
    )

    return (
        <PageContent>
            <Helmet title="Components" />
            <div className="chart_header">
                <h1 className="page_header">Components</h1>
            </div>
            <div className="components__sub-header">
                <ComponentsSearch term={term || ''} onChange={handleSearch} />
                <ComponentsFilters onChange={handleFilter} filter={filter} />
            </div>
            <ComponentsGrid term={term} filter={filter} />
        </PageContent>
    )
}

ComponentsExplorer.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
}

export default ComponentsExplorer
