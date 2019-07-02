//class方式创建类

class Person{
    //通过构造方法添加属性
    constructor(name,age){
      this.name = name;
      this.age = age;
    }

    //添加方法
    say(){
      console.log(this.name);
    }

    //静态方法，属于类，不属于对象
    static run(){
      console.log("正在跑步……");
    }

}

let p1 = new Person("张三",28);

p1.say();

Person.run();

//创建Student学生类继承Person类

class Student extends Person{
   constructor(name,age,skill){
     super(name,age);
     this.skill = skill;
   }

   say(){
     super.say();
     console.log(this.skill);
   }
}

let s1 = new Student("张克勇", 18, "睡觉");

s1.say();