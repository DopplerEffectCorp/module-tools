# module-tools

Available functions :

////////////////////////////////////////////////////////////////

objectToArray(object: any, nameForKey: string = 'key'): any[];

let input = {
  id1: {
    anyKey1: 'first'
  },
  id2: {
    anyKey2: 'second'
  }
};

objectToArray(input, '$key');

Output => [{
  anyKey1: 'first'
  $key: 'id1'
}, {
  anyKey2: 'second'
  $key: 'id2'
}]
////////////////////////////////////////////////////////////////

makeId(randomStringLength: number, ...strings: string[]): string;

////////////////////////////////////////////////////////////////

deleteUndefined(elem: any);

////////////////////////////////////////////////////////////////
