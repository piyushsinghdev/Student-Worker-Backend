class UserInfo{
     constructor(firstName,lastName,mobileNumber,currentState,city,university,courseOfStudy,startYear,EndYear,skill1,skill2,skill3){
        this.personalDetail = {
            firstName :firstName,
            lastName : lastName,
            mobileNumber : mobileNumber,
            currentState : currentState,
            city : city,
        }
        this.educationDetail = {
            university : university,
            courseOfStudy : courseOfStudy,
            startYear : startYear,
            EndYear : EndYear
        }
        this.skillDetail = {
            skill1 : skill1,
            skill2 : skill2,
            skill3 : skill3
        } 
     }
}
module.exports = {UserInfo}