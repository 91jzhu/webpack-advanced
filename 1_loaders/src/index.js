console.log('hello fury')

const p1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(3)
    })
}).then(res=>{
    console.log(res)
})
class Person{
    constructor(name){
        this.name=name
    }
}
let p2=new Person('job')