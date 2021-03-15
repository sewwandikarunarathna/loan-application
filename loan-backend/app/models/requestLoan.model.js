module.exports = mongoose => {
    const schema = mongoose.Schema(
    
            {
                customerId : String,
                type: String,
                amount: Number,
                interest: String,
                duration: String
            },
            {timestamps: true}
        
    );

    
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const RequestLoan = mongoose.model("requestLoan", schema);
    return RequestLoan;
};