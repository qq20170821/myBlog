// 函数节流(throttle)
// 函数节流：一个函数执行一次后，只有大于设定的执行周期后才会执行第二次。

export function throttle (fn, delay) {
  console.log(fn)
  // 记录上一次函数触发的时间
  var lastTime = 0;
  return function () {
    // 记录当前函数触发的时间
    var nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      // 修正this指向问题
      fn.call(this);
      // 同步时间
      lastTime = nowTime;
    }
  }
}

// 函数防抖(debounce)
// 防抖函数：一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效。

export function debounce (fn, delay) {
  // 记录上一次的延时器
  var timer = null;
  return function () {
    // 清除上一次延时器
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(this)
    }, delay)
  }
}
