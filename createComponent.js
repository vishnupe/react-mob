function snakeToCamel(s){
  return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
}

var exec = require('child_process').exec;
console.log('Creating component')
var myArgs = process.argv.slice(2);
let snakeCaseComponentName = myArgs[0];
let camelCaseComponentName = snakeToCamel(myArgs[0]);

let componetTemplate =
`import React from 'react';
class ${camelCaseComponentName} extends React.Component {
constructor(){
  super();
}
render() {
  return (
    <div>
      <h1>{'S A M P L E'} {this.props.name}</h1>
    </div>
  );
}
}
${camelCaseComponentName}.propTypes = {

};
export default ${camelCaseComponentName};`;

let script = 'cd client/components'
              + ' && mkdir '+ camelCaseComponentName
              + ' && cd ' + camelCaseComponentName
              + ' && touch ' + camelCaseComponentName + '.js'
              + ' && touch ' + snakeCaseComponentName + '.css'
              + ' && echo "' + componetTemplate + '" >> ' + camelCaseComponentName+ '.js';

console.log(script)
exec(script, function(err,stdout,stderr){
  console.log(err)
});
