for file in zephyr-ui/lib/**/*.ts; do
  npx documentation build "$file" -f md -o "zephyr-ui/docs/$(basename "$file" .ts).md"
done