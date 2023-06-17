import { ConfigContext, ExpoConfig } from '@expo/config';

const getProfile = (config: Partial<ExpoConfig>) => {
  const profile = process.env.PROFILE;
  if (profile === 'dev') {
    return {
      name: `circle21.lens.dev`,
      icon: './assets/icon-dev.png',
      splash: {
        image: './assets/splash-dev.png',
        resizeMode: config.splash.resizeMode,
        backgroundColor: config.splash.backgroundColor,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: `./assets/adaptive-icon-dev.png`,
          backgroundColor: config.android.adaptiveIcon.backgroundColor,
        },
        package: `${config.android.package}.dev`,
      },
      ios: {
        bundleIdentifier: `${config.ios.bundleIdentifier}.dev`,
      },
    };
  } else if (profile === 'test') {
    return {
      name: `circle21.lens.test`,
      icon: './assets/icon-test.png',
      splash: {
        image: './assets/splash-test.png',
        resizeMode: config.splash.resizeMode,
        backgroundColor: config.splash.backgroundColor,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: `./assets/adaptive-icon-test.png`,
          backgroundColor: config.android.adaptiveIcon.backgroundColor,
        },
        package: `${config.android.package}.dev`,
      },
      ios: {
        bundleIdentifier: `${config.ios.bundleIdentifier}.dev`,
      },
    };
  }
  return {
    name: config.name,
  };
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: config.slug,
  ...getProfile(config),
});
