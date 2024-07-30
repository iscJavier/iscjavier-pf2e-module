const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const tabify = require('gulp-tabify');
const replace = require('gulp-string-replace');
const fs = require('fs');
const path = require('path');
const zip = require('gulp-zip');
const sass = require('gulp-sass')(require('sass'));

const Package = JSON.parse(fs.readFileSync('./package.json'));
const MATCH_PUBLIC = '**/[!_]*';
const Directories = {
  Dist: './dist/',
  Source: './src/',
  Styles: './styles/',
  Lang: './lang/',
  Templates: './templates/',
  DevDist: `${path.join(process.env.FoundryVTTModulesDir, Package.name)}/`,
  Bundle: './package/',
};

const deleteDistDirHandler = (outDir) => {
  const deleteDistDir = () => del(outDir, { force: true });
  return deleteDistDir;
};

const buildStylesHandler = (outDir) => {
  const buildStyles = () =>
    gulp
      .src(`${Directories.Styles}${MATCH_PUBLIC}`)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(`${outDir}${Directories.Styles}`));
  return buildStyles;
};
const buildSourceHandler = (outDir) => {
  const buildSource = () =>
    gulp
      .src(`${Directories.Source}${MATCH_PUBLIC}`)
      .pipe(ts.createProject('./tsconfig.json')())
      .pipe(tabify(2, false))
      .pipe(gulp.dest(`${outDir}${Directories.Source}`));
  return buildSource;
};
const buildManifestHandler = (outDir) => {
  const buildManifest = () =>
    gulp
      .src('./module.json')
      .pipe(replace('{{name}}', Package.name))
      .pipe(replace('{{title}}', Package.title))
      .pipe(replace('{{version}}', Package.version))
      .pipe(replace('{{description}}', Package.description))
      .pipe(gulp.dest(outDir));
  return buildManifest;
};

const outputFilesHandler = (source, destination) => {
  const outputFiles = () => gulp.src(source).pipe(gulp.dest(destination));
  return outputFiles;
};
const outputLanguagesHandler = (outDir) => outputFilesHandler(`${Directories.Lang}${MATCH_PUBLIC}`, `${outDir}${Directories.Lang}`);
const outputTemplatesHandler = (outDir) => outputFilesHandler(`${Directories.Templates}${MATCH_PUBLIC}`, `${outDir}${Directories.Templates}`);
const outputMetaFilesHandler = (outDir) => outputFilesHandler(['./LICENSE', './README.md'], outDir);

const build = (outDir) =>
  gulp
    .series(
      deleteDistDirHandler(outDir),
      gulp.parallel(
        buildStylesHandler(outDir),
        buildSourceHandler(outDir),
        buildManifestHandler(outDir),
      ),
      gulp.parallel(
        outputLanguagesHandler(outDir),
        outputTemplatesHandler(outDir),
        outputMetaFilesHandler(outDir),
      ),
    );

const compressDist = () => {
  const subDir = `${Directories.Dist}/${Package.name}/`;
  const copyDistToSubdir = () =>
    gulp
      .src(`${Directories.Dist}${MATCH_PUBLIC}`)
      .pipe(gulp.dest(subDir));
  const zipSubdir = () =>
    gulp
      .src(`${subDir}${MATCH_PUBLIC}`)
      .pipe(zip(`${Package.name}.zip`))
      .pipe(gulp.dest(Directories.Bundle));
  const copyModuleJSON = () =>
    gulp
      .src(`${Directories.Dist}module.json`)
      .pipe(gulp.dest(Directories.Bundle));
  return gulp.series(
    build(Directories.Dist),
    copyDistToSubdir,
    zipSubdir,
    copyModuleJSON,
    deleteDistDirHandler(subDir),
  );
};

exports.default = build(Directories.Dist);
exports.devbuild = build(Directories.DevDist);
exports.compress = compressDist();