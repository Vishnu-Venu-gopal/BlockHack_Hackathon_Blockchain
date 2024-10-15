from web3 import Web3
import json

# Connect to Ethereum node (e.g., Infura or Alchemy)
infura_url = 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID'
web3 = Web3(Web3.HTTPProvider(infura_url))

# Load contract ABI and address
with open('HealthcareDataMarketplaceABI.json') as f:
    contract_abi = json.load(f)

contract_address = '0xYourDeployedContractAddress'
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Flask API to get patient data
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/get_patient_data/<patient_address>', methods=['GET'])
def get_patient_data(patient_address):
    try:
        data_hash = contract.functions.getPatientData(patient_address).call()
        return jsonify({"data_hash": data_hash})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
