import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AttributeName, CharacterAttribute, AppState } from '../../typings';
import { increaseAttribute, activateAttribute } from '../../character-builder/actions';
import './attribute-list.css';

interface AttributeListDispatch {
  increaseAttribute(attribute: AttributeName): void;
  activateAttribute(attribute: AttributeName): void;
}

interface AttributeListProps {
  attributes: CharacterAttribute[];
  activeAttribute: AttributeName | null;
}

class AttributeList extends React.Component<AttributeListDispatch & AttributeListProps, {}> {
  public render() {
    const activeAttr = this.props.activeAttribute;
    let activePanelClassName = 'attribute-list-panel';
    if (activeAttr) {
      activePanelClassName += ' panel__open';
    }
    const list = this.props.attributes.map((attribute: CharacterAttribute, idx: number) => {
      const toggleAttr = this.props.activateAttribute.bind(null, attribute.full);
      let className = 'attr-item-container';
      if (activeAttr && activeAttr === attribute.full) {
        className += ' active-attribute';
      }
      return (
        <li key={idx} className={className} onClick={toggleAttr}>
          <div className='attr-item'>
            <div className='attr-value'>
              {attribute.value}
            </div>
            <div className='attr-abbrev'>
              {attribute.short.toUpperCase()}
            </div>
          </div>

          <div className='attr-active'>
            <div className='attr-inc'>
              <i className='fas fa-plus' />
            </div>
            <div className='attr-dec'>
              <i className='fas fa-minus' />
            </div>
          </div>
        </li>
      );
    });
    return (
      <div id='attribute-list' className='attribute-list__active'>
        <div className='attribute-list-fc'>
          {list}        
        </div>

        <div className={activePanelClassName}>
          extra content?
        </div>
      </div>
    );
  }
}

const attributeDispatch = (dispatch: Dispatch<AppState>): AttributeListDispatch => {
  return {
    increaseAttribute(attr: AttributeName) {
      dispatch(increaseAttribute(attr));
    },

    activateAttribute(attr: AttributeName) {
      dispatch(activateAttribute(attr));
    }
  }
}

const attributeProps = (state: AppState): AttributeListProps => {
  return {
    attributes: state.characterBuilder.attributes,
    activeAttribute: state.characterBuilder.activeAttribute
  };
}

export default connect(attributeProps, attributeDispatch)(AttributeList);