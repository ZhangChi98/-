//构造函数和原型混合方式来创建类

function Person(name,age){
    //添加属性
    this.name = name;
    this.age = age;
}

//通过原型添加方法

Person.prototype.say = function(){
    console.log(this.name);
}

let p1 = new Person("张三",28);

p1.say();

//继承

//定义子类Student继承Person类
function Student(name,age,skill){
  // 继承父类构造函数
  Person.call(this,name,age);
  //扩展学生的技能属性
  this.skill = skill;
}

//继承Person类的原型
for(let i in Person.prototype ){
    Student.prototype[i] = Person.prototype[i];
}

let s1 = new Student("李甲男",18,"逃学");

s1.say();
