var sieve = function (n) {
  "use strict";

  var array = [],
    primes = [],
    i,
    j;
    for(i=1;i<n;i++){
      array.push(true);
    }

    for(i=2;i<=Math.sqrt(n);i++){
      if(array[i]){
        for(j=i*i;j<n;j+=i){
          array[j]=false;
        }
      }
    }

    for(i=2;i<n;i++){
      if(array[i]){
        primes.push(i);
      }
    }

  return primes;
};

window.onload = function () {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', function () {
      const num = parseInt(document.getElementById('num').value);
      if (!isNaN(num) && num > 1) {
          const primes = sieve(num);
          document.getElementById('primes').textContent = primes.join(', ');
      } else {
          document.getElementById('primes').textContent = "Por favor, introduce un número válido mayor que 1.";
      }
  });
};

console.log(sieve(1000000));
