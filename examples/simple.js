// failfast and write an error log into the module directory
require('../')(__dirname);

// throw an exception
throw new Error('Something went wrong');
