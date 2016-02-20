var classNames = require('classnames');

const mixin = {
  _getComponentNameFromDisplayName() {
    var displayName = this.props.className || this.constructor.displayName;
    return displayName.substring(0,1).toLowerCase() +
      displayName.substring(1);
  },
  getComponentName() {
    return this._componentName || (
      this._componentName = this._getComponentNameFromDisplayName()
    );
  },
  asHelper(displayName) {
    return new function() {
      _.extend(this,
        { props: { className: displayName } },
        _.mapValues(mixin, method => method.bind(this))
      );

      return _.ary(this.b_, 1);
    }
  },
  b_(bemStrings, optIsWrapper) {
    if (typeof bemStrings === 'undefined')
      return this.getComponentName();

    if (typeof bemStrings === 'string')
      bemStrings = [bemStrings];
    var modificatorSeparator = '_',
      elementSeparator = '-',
      bemNotation = {};

    if (this.props.className && optIsWrapper) {
      bemNotation[this.props.className] = true;
    }

    bemStrings.forEach((bemString) => {
      if (typeof bemString !== 'string') {
        bemNotation['wrongBemString'] = true;
        return;
      }
      var modSeparation = bemString.split(modificatorSeparator),
        elementSeparation = modSeparation[0].split(elementSeparator),
        modificator = modSeparation.length > 1 ? modSeparation[1] : null,
        element = elementSeparation.length > 1 ? elementSeparation[1] : null,
        block = elementSeparation[0] || this.getComponentName();

      modificator && Object.keys(this.state || {}).length && modificator in this.state && !this.state[modificator] && (modificator = null);
      bemNotation[block] = !element;
      bemNotation[block + modificatorSeparator + modificator] = !element && !!modificator;
      bemNotation[block + elementSeparator + element] = !!element;
      bemNotation[block + elementSeparator + element + modificatorSeparator + modificator] = !!element && !!modificator;
    });

    return classNames(bemNotation);
  }
};
module.exports = mixin;
