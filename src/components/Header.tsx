import * as React from 'react'
import { PageState } from '../tsClasses'
import { connect } from 'react-redux'
import { toggleTipMenuAction } from '../actions/PageActions'

interface Props {
    toggleTipMenuAction(): void
    PageReducer?: PageState
}

export class Header extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props)
        this.toggleTipMenuAction = this.toggleTipMenuAction.bind(this)
    }

    toggleTipMenuAction() {
        this.props.toggleTipMenuAction()
    }

    render() {
        return (
            <header className="App-header">
            <div className="container px-0">
              <h1 className="header">WYSIWYG - Editor</h1>
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" onClick={ this.toggleTipMenuAction } data-toggle="collapse" data-target="#headerTips" aria-expanded="false" aria-controls="headerTips">Hide tips</a>
                    </li>
                  </ul>
                </div>
              <ul className={"list-group list-group-flush collapse" + (this.props.PageReducer.tipMenuVisible ? ' show' : '')} id="headerTips">
                <li className="list-group-item"><var>#, ##, ###, ####, #####, ######</var> => for</li>
                <li className="list-group-item"><var>*</var> => for unordered lists</li>
                <li className="list-group-item"><var>1., 2. ...</var> => for ordered lists</li>
                <li className="list-group-item"><var>make text bold with *text*</var> (*Hello, I'm Bold* => <strong>Hello, I'm Bold</strong>)</li>
                <li className="list-group-item"><var>make text cursive with __text__</var> (__Hello, I'm Bold__ => H<em>Hello, I'm Bold</em>)</li>
              </ul>
              </div>
            </div>
          </header>
        )
    }
}

const mapStateToProps = (state: PageState) => ({
    ...state
  })
  
  const mapDispatchToProps = (dispatch: any) => ({
    toggleTipMenuAction: () => dispatch(toggleTipMenuAction())
  })

  export default connect(mapStateToProps, mapDispatchToProps)(Header)