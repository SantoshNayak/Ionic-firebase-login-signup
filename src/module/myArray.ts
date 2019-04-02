export class  MyArray{
    //private static users:any = [];
     private static users:Array<any> = [];

     constructor(){
        
    }
    public  setUsers(user){
        MyArray.users.push(user);
        //console.log(MyArray.users);

        
    }
    public getUsers(): any{
        return MyArray.users;

    }
}