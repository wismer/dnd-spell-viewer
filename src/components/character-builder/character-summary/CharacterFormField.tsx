import * as React from 'react';
import { Link } from 'react-router-dom';

interface CharacterFieldProps extends React.Props<any> {
  label: string;
  isEditable: boolean;
  value: string | null;
  centered?: boolean;
  path?: string;
  updateField(field: string, value: number | string): void;
}

class CharacterFormField extends React.Component<CharacterFieldProps> {
  public input: React.RefObject<HTMLInputElement>;
  constructor(props: CharacterFieldProps) {
    super(props);

    this.input = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }
  public onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.input && this.input.current) {
      this.props.updateField('characterName', this.input.current.value);
    }
  }

  public render() {
    // const inputRef = (el: HTMLInputElement) => this.input = el;
    if (this.props.isEditable) {
      return (
        <div className='character-form-field'>
          <form onSubmit={this.onSubmit}>
            <label htmlFor={this.props.label}>
              {this.props.label}
            </label>
  
            <input type='text' ref={this.input} defaultValue={this.props.value || ''}  />
          </form>
        </div>
      );
    }

    let content = (
      <div>
        <div>{this.props.label}</div>
        <div>{this.props.value}</div>
      </div>
    );
    if (this.props.path) {
      content = <Link to={this.props.path}>{content}</Link>
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default CharacterFormField;