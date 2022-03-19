let answer = document.querySelector('.answer');
let operation = document.querySelector('.operation');
let ac = document.querySelector('.AC');
let clear = document.querySelector('.clear');
let divide = document.querySelector('.divide');
let multiply = document.querySelector('.multiply');
let add = document.querySelector('.add');
let sub = document.querySelector('.sub');
let one = document.querySelector('.one');
let two = document.querySelector('.two');
let three = document.querySelector('.three');
let four = document.querySelector('.four');
let five = document.querySelector('.five');
let six = document.querySelector('.six');
let seven = document.querySelector('.seven');
let eigth = document.querySelector('.eigth');
let nine = document.querySelector('.nine');
let decimal = document.querySelector('.decimal');
let zero = document.querySelector('.zero');
let equal = document.querySelector('.equal');

let string = '';

// Functions//////////////////////////////////////////////////////////////////

//refreshes the operation screen////////////////////////
function upload() {
  operation.textContent = string;
}

// to input array to the postfix eval////////////////////////////////////
function infixArrProp(string) {
  let arr = [];
  let bag = '';
  for (let i = 0; i < string.length; i++) {
    if (
      string[i] == '+' ||
      string[i] == '-' ||
      string[i] == '/' ||
      string[i] == '*'
    ) {
      arr.push(bag);
      arr.push(string[i]);
      bag = '';
    } else bag += string[i];
  }
  arr.push(bag);
  return arr;
}

// to create the postfix expression///////////////////////////////////////
function precedence(c) {
  if (c == '^') return 3;
  else if (c == '/' || c == '*') return 2;
  else if (c == '+' || c == '-') return 1;
  else return 0;
}
function isOperand(c) {
  if (c >= '0' && c <= '9') return 1;
  return 0;
}

function infixToPostfix(s) {
  let st = [];
  let postFix = [];
  for (let i = 0; i < s.length; i++) {
    if (isOperand(s[i])) postFix.push(s[i]);
    else if (s[i] == '(') st.push('(');
    else if (s[i] == ')') {
      while (st[st.length - 1] != '(') {
        postFix.push(st[st.length - 1]);
        st.pop();
      }
      st.pop();
    } else {
      while (
        st.length != 0 &&
        precedence(s[i]) <= precedence(st[st.length - 1])
      ) {
        postFix.push(st[st.length - 1]);
        st.pop();
      }
      st.push(s[i]);
    }
  }
  while (st.length != 0) {
    postFix.push(st[st.length - 1]);
    st.pop();
  }
  // console.log(postFix); //// check this to see where going wrong
  return postFix;
}

// to solve the postfix expression//////////////////////////////////////////
function postFixEval(postfixArray) {
  var stack = [];
  for (element of postfixArray) {
    if (isNaN(element)) {
      var x = stack.pop();
      var y = stack.pop();
      if (element == '+') {
        result = y + x;
        stack.push(y + x);
      } else if (element == '-') {
        stack.push(y - x);
      } else if (element == '*') {
        stack.push(y * x);
      } else if (element == '/') {
        stack.push(y / x);
      }
    } else {
      stack.push(parseFloat(element));
    }
  }
  //final check for non numbers within the stack
  var returnValue = null;
  while (stack.length > 0) {
    var element = stack.pop();
    if (isNaN(element)) {
      continue;
    } else {
      returnValue = element;
    }
  }
  return returnValue;
}

// Events//////////////////////////////////////////////////////////

//operators///////////////////////////////////////
add.addEventListener('click', () => {
  let sc = string.length - 1;
  if (
    string[sc] != '+' &&
    string[sc] != '-' &&
    string[sc] != '*' &&
    string[sc] != '/'
  ) {
    string += '+';
    upload();
  }
});
sub.addEventListener('click', () => {
  let sc = string.length - 1;
  if (
    string[sc] != '+' &&
    string[sc] != '-' &&
    string[sc] != '*' &&
    string[sc] != '/'
  ) {
    string += '-';
    upload();
  }
});
multiply.addEventListener('click', () => {
  let sc = string.length - 1;
  if (
    string[sc] != '+' &&
    string[sc] != '-' &&
    string[sc] != '*' &&
    string[sc] != '/'
  ) {
    string += '-';
    upload();
  }
});
divide.addEventListener('click', () => {
  let sc = string.length - 1;
  if (
    string[sc] != '+' &&
    string[sc] != '-' &&
    string[sc] != '*' &&
    string[sc] != '/'
  ) {
    string += '/';
    upload();
  }
});

//equal///////////////////////////////////////
equal.addEventListener('click', () => {
  // let propinfix = infixArrProp(string);
  // let postfix = infixToPostfix(propinfix);
  // let ans = postfixEval(infixToPostfix(infixArrProp(string)));
  answer.textContent = postFixEval(infixToPostfix(infixArrProp(string)));
  string = '0';
  upload();
});

//numbers///////////////////////////////////
decimal.addEventListener('click', () => {
  string += '.';
  upload();
});
zero.addEventListener('click', () => {
  string += '0';
  upload();
});
one.addEventListener('click', () => {
  string += '1';
  upload();
});
two.addEventListener('click', () => {
  string += '2';
  upload();
});
three.addEventListener('click', () => {
  string += '3';
  upload();
});
four.addEventListener('click', () => {
  string += '4';
  upload();
});
five.addEventListener('click', () => {
  string += '5';
  upload();
});
six.addEventListener('click', () => {
  string += '6';
  upload();
});
seven.addEventListener('click', () => {
  string += '7';
  upload();
});
eigth.addEventListener('click', () => {
  string += '8';
  upload();
});
nine.addEventListener('click', () => {
  string += '9';
  upload();
});

//clearing//////////////////////////////////////////////
clear.addEventListener('click', () => {
  string.slice(0, -1);
  upload();
});
ac.addEventListener('click', () => {
  location.reload();
});
