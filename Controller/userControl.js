
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

    static fromJSON(json) {
        return new Node(
          json.type,
          json.value,
          json.left ? Node.fromJSON(json.left) : null,
          json.right ? Node.fromJSON(json.right) : null
        );
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

  function evaluate_rule(node, data) {
    if (node.type === 'operand') {
      const { left, operator, right } = node.value;
      const leftValue = data[left] || left;
      let rightValue = data[right] || right;
  
      if (typeof rightValue === 'string' && rightValue.startsWith("'") && rightValue.endsWith("'")) {
        rightValue = rightValue.slice(1, -1);
      }
  
      switch (operator) {
        case '>': return leftValue > rightValue;
        case '<': return leftValue < rightValue;
        case '>=': return leftValue >= rightValue;
        case '<=': return leftValue <= rightValue;
        case '=': return leftValue == rightValue;
        default: throw new Error(`Unknown operator: ${operator}`);
      }
    } else if (node.type === 'operator') {
      const leftResult = evaluate_rule(node.left, data);
      const rightResult = evaluate_rule(node.right, data);
  
      return node.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;
    }
  
    throw new Error('Invalid node type');
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

    evaluate_rule: async (req, res) => {
        try {
          let { ast, data } = req.body;
          
          if (!ast || !data || typeof ast !== 'object' || typeof data !== 'object') {
            return res.status(400).json({
              success: false,
              msg: "Invalid input. Please provide both 'ast' and 'data' as objects."
            });
          }
    
          const node = Node.fromJSON(ast);
          const result = evaluate_rule(node, data);
    
          res.status(200).json({
            success: true,
            msg: "Rule evaluated successfully!",
            result: result
          });
        }
        catch (error) {
          res.status(400).json({ success: false, msg: error.message });
          console.log(error);
        }
    }


  };
  
  module.exports = userCtrl;