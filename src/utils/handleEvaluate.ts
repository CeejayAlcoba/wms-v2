type Variables = {
  [key: string]: number;
};

const handleEvaluate = (expr: string, vars: Variables) => {
  try {
    const fn = new Function(...Object.keys(vars), `return ${expr};`);
    return fn(...Object.values(vars));
  } catch (error) {
    console.error("Invalid expression", error);
    return NaN;
  }
};

export default handleEvaluate;