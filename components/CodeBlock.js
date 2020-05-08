import React, { PureComponent } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy, Check } from 'react-feather'

const preStyle = {
  borderRadius: 6,
  padding: '1.7em',
  lineHeight: '2.3em',
}

const codeProps = {
  style: {
    fontFamily: `ibm-plex-mono, Consolas, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New'`,
    fontSize: '18.5px'
  }
}

class CodeBlock extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      removeLines: [],
      addLines: [],
      updateLines: [],
      copiedToClipboard: false,
      displayCopyButton: false,
    }
  }

  copyToClipboard = () => {
    this.setState({
      ...this.state,
      copiedToClipboard: true
    }, () => {
      setTimeout(() => {
        this.setState({
          ...this.state,
          copiedToClipboard: false
        })
      }, 3500)
    })
  }

  componentDidMount() {
    const { language } = this.props;
    const linesObj = language && language.split(":")[1]

    if (linesObj) {
      const splittedValues = linesObj.split(',')
      let stateLabel
      let linesToUpdate = {
        removeLines: [], addLines: [], updateLines: [],
      }

      splittedValues.map(lines => {
        const linesRange = lines.split(',')

        linesRange.map(eachLine => {
          const splitted = eachLine.split('-')

          if (splitted[0] === '') { // Is removing lines
            splitted.shift()
            stateLabel = 'removeLines'
          } else if (splitted[0] === '!') {
            splitted.shift()
            stateLabel = 'updateLines'
          } else {
            stateLabel = 'addLines'
          }

          if (splitted.length > 1) {
            for (let i = parseInt(splitted[0]); i <= parseInt(splitted[1]); i++) {
              linesToUpdate[stateLabel].push(i)
            }
          } else { // Only one liner
            linesToUpdate[stateLabel].push(parseInt(splitted[0]))
          }

          this.setState({
            [stateLabel]: [
              ...this.state[stateLabel], ...linesToUpdate[stateLabel]
            ]
          })
        })
      })
    }
  }

  toggleCopyButton = () => {
    this.setState({ ...this.state, displayCopyButton: !this.state.displayCopyButton })
  }

  render() {
    const { language, value } = this.props;
    const { addLines, removeLines, updateLines, copiedToClipboard, displayCopyButton } = this.state

    return (
      <div
        onMouseEnter={() => this.toggleCopyButton()}
        onMouseLeave={() => this.toggleCopyButton()}
      >
        <SyntaxHighlighter
          language={language}
          style={anOldHope}
          customStyle={preStyle}
          codeTagProps={codeProps}
          wrapLines
          lineProps={lineNumber => {
            const mergedLines = addLines.concat(removeLines).concat(updateLines)
            let style = { display: 'block' };

            if (mergedLines.includes(lineNumber)) {
              style = {
                ...style,
                margin: '0 -22px',
                padding: '3px 12px 6px'
              }
            }

            if (removeLines.includes(lineNumber)) {
              style = {
                ...style,
                borderLeft: `6px #f9320c solid`,
                background: `rgba(249, 50, 12, .1)`
              }
            } else if (addLines.includes(lineNumber)) {
              style = {
                ...style,
                borderLeft: `6px #3ac569 solid`,
                background: `rgba(58, 197, 105, .1)`
              }
            } else if (updateLines.includes(lineNumber)) {
              style = {
                ...style,
                borderLeft: `6px #f9c00c solid`,
                background: `rgba(249, 192, 12, .1)`
              }
            }

            return { style };
          }}
        >
          {value}
        </SyntaxHighlighter>

        <div className="copy-to-clipboard">
          <CopyToClipboard text={value} onCopy={() => this.copyToClipboard()}>
            <button>
              {copiedToClipboard ? 'Copied ✔' : 'Copy'}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

export default CodeBlock
