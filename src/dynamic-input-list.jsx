/**
  * <DynamicOptionList />
  */

 import React from 'react';
 import ID from './UUID';

 export default class DynamicOptionList extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       element: this.props.element,
       data: this.props.data,
       dirty: false,
     };
   }

   _setValue(text) {
     return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
   }

   editOption(option_index, e) {
     const this_element = this.state.element;
    //  const val = (this_element.options[option_index].value !== this._setValue(this_element.options[option_index].text)) ? this_element.options[option_index].value : this._setValue(e.target.value);

     this_element.options[option_index].field_name = e.target.value;
     this.props.updateElement.call(this.props.preview, this_element);
     this.setState({
       element: this_element,
       dirty: true,
     });
   }

   editValue(option_index, e) {
     const this_element = this.state.element;
     this_element.options[option_index].operation = e.target.value;
     this.props.updateElement.call(this.props.preview, this_element);
     this.setState({
       element: this_element,
       dirty: true,
     });
   }

   // eslint-disable-next-line no-unused-vars
  //  editOptionCorrect(option_index, e) {
  //    const this_element = this.state.element;
  //    if (this_element.options[option_index].hasOwnProperty('correct')) {
  //      delete (this_element.options[option_index].correct);
  //    } else {
  //      this_element.options[option_index].correct = true;
  //    }
  //    this.setState({ element: this_element });
  //    this.props.updateElement.call(this.props.preview, this_element);
  //  }

   updateOption() {
     const this_element = this.state.element;
     // to prevent ajax calls with no change
     this_element.options.forEach((item)=>{
      item.operation= item.operation=="" ? "+" :item.operation
     });
     if (this.state.dirty) {
       this.props.updateElement.call(this.props.preview, this_element);
       this.setState({ dirty: false });
     }
   }

   addOption(index) {
     const this_element = this.state.element;
     this_element.options.splice(index + 1, 0, { field_name: '', key: `math_option_${ID.uuid()}`, operation: '+' });
     this.props.updateElement.call(this.props.preview, this_element);
   }

   removeOption(index) {
     const this_element = this.state.element;
     this_element.options.splice(index, 1);
     this.props.updateElement.call(this.props.preview, this_element);
   }

   render() {
     const elements = this.props.items.filter(item => item.element === 'NumberInput');
     return (
       <div className="dynamic-option-list">
         <ul>
           <li>
             <div className="row">
               <div className="col-sm-6"><b>Inputs</b></div>
               <div className="col-sm-2"><b>Operation</b></div>
             </div>
           </li>
           {
             this.props.element.options.map((option, index) => {
               const this_key = `edit_${option.key}`;
               const val = (option.operation !== this._setValue(option.operation)) ? option.operation : '';
               return (
                 <li className="clearfix" key={this_key}>
                   <div className="row">
                     <div className="col-sm-6">
                       {/* <input tabIndex={index + 1} className="form-control" style={{ width: '100%' }} type="text" name={`text_${index}`} placeholder="hours" value={option.text} onBlur={this.updateOption.bind(this)} onChange={this.editOption.bind(this, index)} /> */}
                      <select className="form-control" onChange={this.editOption.bind(this, index)} value={option.field_name}>
                        <option value=''>select</option>
                        {elements.map((item) => {
                          const this_key = item.field_name;
                          return <option value={item.field_name} key={this_key}>{item.label}</option>;
                        })}
                      </select>
                     </div>
                     { this.props.element.options.length > index+1 ? (
                       <div className="col-sm-2">
                       {/* <input className="form-control" type="text" name={`value_${index}`} value={val} onChange={this.editValue.bind(this, index)} onBlur={this.updateOption.bind(this)} maxLength="1"/> */}
                       <select className="form-control" onChange={this.editValue.bind(this, index)} value={option.operation}>

                        <option value='+'>+</option>
                        <option value='-'>-</option>
                        <option value='*'>*</option>
                        <option value='/'>/</option>

                      </select>
                     </div>)
                     : (
                       <div className="col-sm-2"/>
                     )
                     }

                     {/*  <div className="col-sm-1">
                       <input className="form-control" type="checkbox" value="1" onChange={this.editOptionCorrect.bind(this, index)} checked={option.hasOwnProperty('correct')} />
                     </div> */}
                     <div className="col-sm-3">
                       <div className="dynamic-options-actions-buttons">
                         <button onClick={this.addOption.bind(this, index)} className="btn btn-success"><i className="fa fa-plus-circle"></i></button>
                         { index - 1 < index
                           && <button onClick={this.removeOption.bind(this, index)} className="btn btn-danger"><i className="fa fa-minus-circle"></i></button>
                         }
                       </div>
                     </div>
                   </div>
                 </li>
               );
             })
           }
         </ul>
       </div>
     );
   }
 }
