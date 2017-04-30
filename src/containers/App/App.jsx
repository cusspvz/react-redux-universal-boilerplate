import React, { PureComponent, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { injectIntl } from 'react-intl'
import classnames from 'classnames'

import styled from 'boilerplate/features/styled'
import style from './App.less'

@injectIntl
@styled( style )
export default class App extends PureComponent {

  static propTypes = {
    intl: PropTypes.object,
  }

  render () {
    const { intl, children } = this.props

    return (
      <div className={style.locals.root}>
        <Helmet
          defaultTitle='React Boilerplate'
          titleTemplate={`%s | ${intl.formatMessage({ id: 'containers.app.title.template' })}`}
          htmlAttributes={{ lang: intl.locale , amp: '' }}
          link={[
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css' },
          ]}
          script={[
            // { type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js', charset: 'UTF-8' },
            // { type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js', charset: 'UTF-8' },
          ]}
        />
        {children}
      </div>
    )
  }
}
