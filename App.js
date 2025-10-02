import { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const buttons = [
  ['C', 'CE', '%', '⌫'],
  ['√', 'x²', '1/x', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['+/-', '0', '.', '='],
];

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    try {
      if (input) {
        let expr = input
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/√/g, 'Math.sqrt')
          .replace(/x²/g, '**2')
          .replace(/1\/x/g, '1/');

        const evalResult = eval(expr);
        setResult(evalResult.toString());
      } else {
        setResult('');
      }
    } catch (e) {
      setResult('');
    }
  }, [input]);

  const handlePress = (btn) => {
    Vibration.vibrate(10); // vibrate for 10ms
    if (btn === 'C') {
      setInput('');
      setResult('');
    } else if (btn === 'CE') {
      setInput('');
    } else if (btn === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } else if (btn === '=') {
      if (result) setInput(result);
    } else if (btn === '√') {
      setInput((prev) => prev + '√(');
    } else if (btn === 'x²') {
      setInput((prev) => prev + 'x²');
    } else if (btn === '1/x') {
      setInput((prev) => '1/(' + prev + ')');
    } else if (btn === '+/-') {
      if (input.startsWith('-')) setInput(input.substring(1));
      else setInput('-' + input);
    } else {
      setInput((prev) => prev + btn);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display removed background */}
      <View style={styles.display}>
        <Text style={styles.inputText} numberOfLines={1} adjustsFontSizeToFit>
          {input}
        </Text>
        <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
          {result}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn, colIndex) => {
              const isOperator = ['/', '*', '-', '+', '%'].includes(btn);
              const isEquals = btn === '=';
              const isFunction = ['√', 'x²', '1/x'].includes(btn);
              const isControl = ['C', 'CE', '⌫'].includes(btn);

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.button,
                    isOperator && styles.functionButton,
                    isEquals && styles.equalsButton,
                    isFunction && styles.functionButton,
                    isControl && styles.functionButton,
                  ]}
                  onPress={() => handlePress(btn)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isEquals && { color: '#fff' },
                    ]}
                  >
                    {btn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    justifyContent: 'flex-end',
    padding: 12,
  },
  display: {
    padding: 20,
    marginBottom: 20,
    minHeight: 160,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 28,
    color: '#76ff7a',
  },
  resultText: {
    fontSize: 44,
    color: '#b0ffb0',
    fontWeight: 'bold',
    marginTop: 8,
  },
  buttonsContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3a3a3a',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: 75, // increased button size
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#555',
  },
  operatorButton: {
    backgroundColor: '#505050',
  },
  functionButton: {
    backgroundColor: '#434343ff',
  },
  controlButton: {
    backgroundColor: '#666',
  },
  equalsButton: {
    backgroundColor: '#1FD660',
    flex: 1,
  },
  buttonText: {
    fontSize: 24, // slightly larger text
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
