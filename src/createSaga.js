export default function(domain, name, saga) {
  domain.register('sagas', name, saga)
}
