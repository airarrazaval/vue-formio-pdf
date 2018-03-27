
export default class Input {
  constructor(label, value, options) {
    this.label = label || ''
    this.value = value || '-'
    this.options = options || {}
  }

  hideLabel () {
    return this.options.hideLabel || false
  }

  type () {
    return this.options.type || 'textfield'
  }

  template () {
    return this.options.template || './templates/input.html'
  }

  getValue () {
    return [ ( this.options.prefix || '' ),( this.options.suffix || '' ), this.value ].join(' ').trim()
  }

  html () {
    if (this.options.inDataGrid) {
      return '<p>' + this.getValue() + '</p>'
    } else {
      let html = '<div class="form-horizontal">'
      return html
    }
    
  }
  
}