Java.perform(function () {
    let AttendeeDatabaseFactory = Java.use("com.eventbase.database.attendee.AttendeeDatabaseFactory");
    
    // Hooking the open function
    AttendeeDatabaseFactory.open.implementation = function (group, file) {
        console.log(`AttendeeDatabaseFactory.open is called: group=${group}, file=${file}`);
        
        // Getting the passwordStorage instance
        let passwordStorage = this.passwordStorage.value;
        
        // Getting the 'get' method of passwordStorage
        let getMethod = passwordStorage.get;
        
        // Invoking the 'get' method with the 'file' argument
        let password = getMethod.call(passwordStorage, file);
        
        // Logging the result
        console.log(`Password retrieved: ${password}`);
        
        // Calling the original 'open' function
        let result = this.open(group, file);
        console.log(`AttendeeDatabaseFactory.open result=${result}`);
        
        return result;
    };
});
