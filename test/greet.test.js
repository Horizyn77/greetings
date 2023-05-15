describe("Testing my Greetings function", function() {
    describe("Testing greetings for various names and languages", function() {
        it("should return a greeting in English for the name given", function() {
            greetings.setGreeting("Hidaayat", "eng");
            assert.equal("Hello, Hidaayat", greetings.getGreeting());
        })
    
        it("should return a greeting in Arabic for the name given", function() {
            greetings.setGreeting("Thabo", "ara");
            assert.equal("Marhaba, Thabo", greetings.getGreeting());
        })
        it("should return a greeting in Urdu for the name given", function() {
            greetings.setGreeting("Ryan", "urd");
            assert.equal("Salaam, Ryan", greetings.getGreeting());
        })
    })
    describe("Testing the counter that displays the number of times greeted", function() {
        it("should return the count of 1 when a person is greeted once", function() {

            greetings.setReset();
            greetings.setGreeting("Hidaayat", "eng");
            greetings.setCounter("Hidaayat");

            assert.equal(1, greetings.getCounter());
        })

        it("should return the count of 1 when a person with the same name is greeted more than once", function() {
            
            greetings.setReset();
            greetings.setGreeting("Hidaayat", "eng");
            greetings.setCounter("Hidaayat");

            greetings.setGreeting("Hidaayat", "ara");
            greetings.setCounter("Hidaayat");

            assert.equal(1, greetings.getCounter());
        })

        it("should return the count of 2 when two people with different names are greeted after each other", function() {
            greetings.setReset();
            greetings.setGreeting("Hidaayat", "eng");
            greetings.setCounter("Hidaayat");

            greetings.setGreeting("Robert", "ara");
            greetings.setCounter("Robert");

            assert.equal(2, greetings.getCounter());
        })
    })

    describe("Testing the reset button that resets the number of times greeted", function() {
        it("should return 0 as count after greeting two different people and then resetting the count", function() {
            greetings.setReset();

            greetings.setGreeting("Jacob", "urd");
            greetings.setCounter("Jacob");

            greetings.setGreeting("Mark", "eng");
            greetings.setCounter("Mark");

            assert.equal(2, greetings.getCounter());

            greetings.setReset();

            assert.equal(0, greetings.getCounter());
        })
    })

    describe("Testing the error messages for various inputs", function() {

        /* setErrMsg takes in three arguments respectively that checks whether there is a value inputted or not, whether 
            the radio button is checked or not and another boolean for whether the string inputted contains a number or not
            To test the various scenarios we will pass it true or false for the various conditions:
            i.e whether a value is input or not, whether a radio button has been checked or not
            and whether the value inputted contains a number or not
            */

        it("should show a message of 'Numbers are not allowed' when a value is input with a number and the radio button is checked", function() {
            greetings.setErrMsg(true, true, true);
            assert.equal("Numbers are not allowed", greetings.getErrMsg());
        })

        it("should show a message of 'A name and language is required' when you don't provide an input with a name and no language", function() {
            greetings.setErrMsg(false, false);
            assert.equal("A name and language is required", greetings.getErrMsg());
        })
        
        it("should show a message of 'A language is required' when you provide an input with a name but no language", function() {
            greetings.setErrMsg(true, false);

            assert.equal("A language is required", greetings.getErrMsg());
        })
        it("should show a message of 'A name is required' when you provide an input with no name but have a language", function() {
            greetings.setErrMsg(false, true);

            assert.equal("A name is required", greetings.getErrMsg());
        })
    })
    
})