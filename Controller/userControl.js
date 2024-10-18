
class Node {
    constructor(type, value = null, left = null, right = null) {
      this.type = type;
      this.value = value;
      this.left = left;
      this.right = right;
    }
  
    toJSON() {
      return {
        type: this.type,
        value: this.value,
        left: this.left ? this.left.toJSON() : null,
        right: this.right ? this.right.toJSON() : null
      };
    }
  }
  
  function tokenize(ruleString) {
    return ruleString.match(/\(|\)|\w+|[<>=]+|\d+|'[^']*'/g);
  }
  
  function parse(tokens) {
    let index = 0;
  
    function parseExpression() {
      let node = parseTerm();
  
      while (index < tokens.length && (tokens[index] === 'AND' || tokens[index] === 'OR')) {
        const operator = tokens[index++];
        const right = parseTerm();
        node = new Node('operator', operator, node, right);
      }
  
      return node;
    }
  
    function parseTerm() {
      if (tokens[index] === '(') {
        index++;
        const node = parseExpression();
        index++; 
        return node;
      } else {
        const left = tokens[index++];
        const operator = tokens[index++];
        const right = tokens[index++];
        return new Node('operand', { left, operator, right });
      }
    }
  
    return parseExpression();
  }
  
  function create_rule(rule_string) {
    const tokens = tokenize(rule_string);
    return parse(tokens);
  }
  
  const userCtrl = {
    create_rule: async (req, res) => {
      try {
        let { rule } = req.body;
        
        if (!rule || typeof rule !== 'string') {
          return res.status(400).json({
            success: false,
            msg: "Invalid rule format. Please provide a string."
          });
        }
  
        const ast = create_rule(rule);
  
        res.status(200).json({
          success: true,
          msg: "Rule created successfully!",
          rule: rule,
          ast: ast.toJSON()
        });
      }
      catch (error) {
        res.status(400).json({ success: false, msg: error.message });
        console.log(error);
      }
    },
  };
  
  module.exports = userCtrl;