function snakeToCamel(s){
  return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
}
function capitalizeFirst(s) {
  return s.replace(/(\b\w)/g, function(m){return m[0].toUpperCase();});
}
function removeDash(s){
  return s.replace(/(\-)/g, function(){return '';});
}
function snakeToPascal(s){
  return removeDash(capitalizeFirst(s));
}

const exec = require('child_process').exec;


const myArgs = process.argv.slice(2);
let snakeCaseComponentName = myArgs[0];
let pascalCaseComponentName = snakeToPascal(myArgs[0]);
console.log('Creating component ',pascalCaseComponentName)
let componetTemplate =
`import React from 'react';
class ${pascalCaseComponentName} extends React.Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div>
        <h1>{'S A M P L E'}</h1>
      </div>
    );
  }
}
${pascalCaseComponentName}.propTypes = {

};
export default ${pascalCaseComponentName};`;

let script = 'cd client/components'
              + ' && mkdir '+ pascalCaseComponentName
              + ' && cd ' + pascalCaseComponentName
              + ' && touch ' + pascalCaseComponentName + '.js'
              + ' && touch ' + snakeCaseComponentName + '.css'
              + ' && echo "' + componetTemplate + '" >> ' + pascalCaseComponentName+ '.js';

// console.log(script)
exec(script, function(err,stdout,stderr){
  console.log(stderr)
});
