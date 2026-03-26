import FieldError from "../../../components/FieldError";

function BarcodeInputForm({ value, handleOnchange, handleBlur, error, touched, handleSubmit }) {
  return (
    <>
      <div className="barcode-input-wrapper">
        <div className="form-group">
          <label style={{ color: '#000000', fontSize: '1rem', padding: '1rem' }}>Barcode</label>
          <input
            placeholder="Enter barcode number. Ex: 3017624010701"
            value={value}
            onChange={(e) => handleOnchange(e.target.value)}
            onBlur={handleBlur}
            className={`barcode-input ${error && touched ? 'error-border' : ''}`}
          />
          <FieldError error={error} touched={touched} />
        </div>

        <button className="upload-button w-100" onClick={handleSubmit}>
          Get Barcode Information
        </button>
      </div>
    </>
  )
}

export default BarcodeInputForm;