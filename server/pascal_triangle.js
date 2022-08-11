function pascal_triangle(n, current = 1, prev = []) {
  if (n < 1) return;

  res = [1].concat(prev.map((e, i) => e + (prev[i + 1] ?? 0)));

  console.log(current === 1 ? '1' : current === 2 ? '1 1' : res.join(' '));

  return pascal_triangle(n - 1, ++current, res);
}

pascal_triangle(3);
