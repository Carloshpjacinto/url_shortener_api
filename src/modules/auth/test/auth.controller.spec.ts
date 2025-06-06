import { AuthController } from '../controller/auth.controller';
import { LoginAuthUserService } from '../services/loginAuthUser.service';
import { CreateUserService } from 'src/modules/users/services/createUser.service';
import { ProfileAuthUserService } from '../services/profileAuthUser.service';
import { CreateUrlShortenerService } from 'src/modules/urls/services/createUrlShortener.service';
import { RedirectUrlAuthService } from '../services/redirectUrlAuth.service';
import { DeleteUrlShortenerService } from 'src/modules/urls/services/deleteUrlShortener.service';
import { FindAllUrlShortenerService } from 'src/modules/urls/services/findAllUrlShortener.service';
import { UpdateUrlShortenerService } from 'src/modules/urls/services/updateUrlShortener.service';

describe('AuthController', () => {
  let authController: AuthController;
  let loginAuthUserService: LoginAuthUserService;
  let createUserService: CreateUserService;
  let profileAuthUserService: ProfileAuthUserService;
  let createUrlShortenerService: CreateUrlShortenerService;
  let redirectUrlAuthService: RedirectUrlAuthService;
  let deleteUrlShortenerService: DeleteUrlShortenerService;
  let findAllUrlShortenerService: FindAllUrlShortenerService;
  let updateUrlShortenerService: UpdateUrlShortenerService;

  beforeEach(() => {
    loginAuthUserService = { execute: jest.fn() } as any;
    createUserService = { execute: jest.fn() } as any;
    profileAuthUserService = { execute: jest.fn() } as any;
    createUrlShortenerService = { execute: jest.fn() } as any;
    redirectUrlAuthService = { execute: jest.fn() } as any;
    deleteUrlShortenerService = { execute: jest.fn() } as any;
    findAllUrlShortenerService = { execute: jest.fn() } as any;
    updateUrlShortenerService = { execute: jest.fn() } as any;

    authController = new AuthController(
      loginAuthUserService,
      createUserService,
      profileAuthUserService,
      createUrlShortenerService,
      redirectUrlAuthService,
      deleteUrlShortenerService,
      findAllUrlShortenerService,
      updateUrlShortenerService,
    );
  });

  describe('register', () => {
    it('should call createUserService.execute with correct dto', async () => {
      const dto = { email: 'test@test.com', password: '123456' };
      (createUserService.execute as jest.Mock).mockResolvedValue('createdUser');

      const result = await authController.register(dto as any);

      expect(createUserService.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe('createdUser');
    });
  });

  describe('login', () => {
    it('should call loginAuthUserService.execute with correct dto', async () => {
      const dto = { email: 'test@test.com', password: '123456' };
      (loginAuthUserService.execute as jest.Mock).mockResolvedValue('token');

      const result = await authController.login(dto as any);

      expect(loginAuthUserService.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe('token');
    });
  });

  describe('profile', () => {
    it('should throw error if email is missing', () => {
      expect(() => authController.profile(null as any)).toThrow(
        'You need to be authenticated to access your profile.',
      );
    });

    it('should call profileAuthUserService.execute with email', async () => {
      (profileAuthUserService.execute as jest.Mock).mockResolvedValue(
        'profileData',
      );

      const result = await authController.profile('user@example.com');

      expect(profileAuthUserService.execute).toHaveBeenCalledWith(
        'user@example.com',
      );
      expect(result).toBe('profileData');
    });
  });

  describe('deleteUrl', () => {
    it('should throw error if id is missing', () => {
      expect(() => authController.deleteUrl('someUrl', null)).toThrow(
        'You need to be authenticated to delete this URL.',
      );
    });

    it('should call deleteUrlShortenerService.execute with url and id', async () => {
      (deleteUrlShortenerService.execute as jest.Mock).mockResolvedValue(
        'deleted',
      );

      const result = await authController.deleteUrl('someUrl', 123);

      expect(deleteUrlShortenerService.execute).toHaveBeenCalledWith(
        'someUrl',
        123,
      );
      expect(result).toBe('deleted');
    });
  });

  describe('findAllUrl', () => {
    it('should throw error if id is missing', () => {
      expect(() => authController.findAllUrl('1', '10', null)).toThrow(
        'You need to be authenticated to view the URLs.',
      );
    });

    it('should call findAllUrlShortenerService.execute with id, page and limit', async () => {
      (findAllUrlShortenerService.execute as jest.Mock).mockResolvedValue([
        'url1',
        'url2',
      ]);

      const result = await authController.findAllUrl('2', '5', 123);

      expect(findAllUrlShortenerService.execute).toHaveBeenCalledWith(
        123,
        2,
        5,
      );
      expect(result).toEqual(['url1', 'url2']);
    });
  });

  describe('updateUrl', () => {
    it('should throw error if userId is missing', () => {
      expect(() =>
        authController.updateUrl('oldUrl', 'newUrl', null as any),
      ).toThrow('You need to be authenticated to update this URL.');
    });

    it('should call updateUrlShortenerService.execute with oldUrl, newUrl, userId', async () => {
      (updateUrlShortenerService.execute as jest.Mock).mockResolvedValue(
        'updated',
      );

      const result = await authController.updateUrl('oldUrl', 'newUrl', 123);

      expect(updateUrlShortenerService.execute).toHaveBeenCalledWith(
        'oldUrl',
        'newUrl',
        123,
      );
      expect(result).toBe('updated');
    });
  });
});
