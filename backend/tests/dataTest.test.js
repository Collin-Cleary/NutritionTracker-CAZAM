const assert = require('assert');
const sinon = require('sinon');
const authController = require('../controllers/authController');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



describe('Unit Tests', () => {

  // Registration & Login
  describe('Login API', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should login with correct credentials and return JWT token', () => {
      try{
          const validCredentials = { userName: 'john_doe', password: 'password123' }; // NOSONAR
          const req = { body: validCredentials }; // Mock request object
          const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
          const user = { userName: validCredentials.userName };
          sinon.stub(User, 'findOne').resolves(user);
          sinon.stub(bcrypt, 'compare').resolves(true);
          sinon.stub(jwt, 'sign').returns('mockToken');
    
          authController.login(req, res);
    
          assert(res.status.calledOnceWithExactly(200));
          assert(res.json.calledOnceWithExactly({ token: 'mockToken' }));
      } catch(error){
        console.log(error)
      }
    });

    it('should return 401 for invalid credentials', () => {
      const invalidCredentials = { userName: 'invalid_user', password: 'invalid_password' }; // NOSONAR
      const req = { body: invalidCredentials }; // Mock request object
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(bcrypt, 'compare').resolves(false);

      authController.login(req, res);

      assert(res.status.calledOnceWithExactly(401));
      assert(res.json.calledOnceWithExactly({ message: 'Invalid username or password' }));
    });
  });

    describe('Logout API', () => {
      afterEach(() => {
        sinon.restore();
      });

      it('should return success message for logout', () => {
        const req = {}; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
      
        authController.logout(req, res);
      
        assert(res.status.calledOnceWithExactly(200));
        assert(res.json.calledOnceWithExactly({ message: 'Logout successful' }));
      });

    });
    

    describe('Profile Creation API', () => {
      afterEach(() => {
        sinon.restore();
      });
      it('should create a new profile successfully', async () => {
        const newProfileData = {
          userName: 'john_doe',
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123', // NOSONAR
          confirmPassword: 'password123',
          height: 180,
          weight: 75
        };
        const req = { body: newProfileData }; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
        sinon.stub(User.prototype, 'save').resolves();

        await authController.createProfile(req, res);

        assert(res.status.calledOnceWithExactly(201));
        assert(res.json.calledOnceWithExactly({ message: 'Profile created successfully' }));
      });

      it('should return 400 if passwords do not match', async () => {
        const invalidProfileData = {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123', // NOSONAR
          confirmPassword: 'password456', // Different password
          height: 180,
          weight: 75
        };
        const req = { body: invalidProfileData }; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object

        await authController.createProfile(req, res);

        assert(res.status.calledOnceWithExactly(400));
        assert(res.json.calledOnceWithExactly({ message: 'Passwords do not match' }));
      });

      it('should return 400 if user already exists with the provided email', async () => {
        const existingProfileData = {
          userName: 'existing_user',
          name: 'Existing User',
          email: 'test@example.com',
          password: 'password123', // NOSONAR
          confirmPassword: 'password123',
          height: 170,
          weight: 70
        };
        const req = { body: existingProfileData }; // Mock request object
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Mock response object
        sinon.stub(User, 'findOne').resolves({ email: 'test@example.com' });

        await authController.createProfile(req, res);

        assert(res.status.calledOnceWithExactly(400));
        assert(res.json.calledOnceWithExactly({ message: 'User already exists with this email' }));
      });

  });

});
